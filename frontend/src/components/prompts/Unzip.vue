<template>
  <div class="card floating">
    <div class="card-title">
      <h2>{{ $t("prompts.unzip") }}</h2>
    </div>
    <div class="card-content">
      <file-list @update:selected="(val) => (dest = val)"></file-list>
    </div>
    <div class="card-action">
      <button
        class="button button--flat button--grey"
        @click="closeHovers"
        :aria-label="$t('buttons.cancel')"
        :title="$t('buttons.cancel')"
        tabindex="3"
      >
        {{ $t("buttons.cancel") }}
      </button>
      <button
        id="focus-prompt"
        class="button button--flat"
        @click="unzip"
        :aria-label="$t('buttons.unzip')"
        :title="$t('buttons.unzip')"
        tabindex="2"
      >
        {{ $t("buttons.unzip") }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import FileList from "./FileList.vue";
import { files as api } from "@/api";
import buttons from "@/utils/buttons";
import { useFileStore } from "@/stores/file";
import { useLayoutStore } from "@/stores/layout";
export default {
  name: "unzip",
  components: { FileList },
  data: function () {
    return {
      current: window.location.pathname,
      dest: null,
    };
  },
  inject: ["$showError"],
  computed: {
    ...mapState(useFileStore, ["req", "selected"]),
    ...mapWritableState(useFileStore, ["reload"]),
  },
  methods: {
    ...mapActions(useLayoutStore, ["closeHovers"]),
    unzip: async function (event) {
      event.preventDefault();
      let items = [];
      for (let item of this.selected) {
        items.push({
          from: this.req.items[item].url,
          to: this.dest,
          name: this.req.items[item].name,
        });
      }
      let action = async () => {
        buttons.loading("unzip");
        await api
          .unzip(items)
          .then(() => {
            buttons.success("unzip");
            if (this.$route.path === this.dest) {
              this.reload = true;
              this.closeHovers();
            } else {
              this.$router.push({ path: this.dest });
            }
          })
          .catch((e) => {
            buttons.done("unzip");
            this.$showError(e);
          });
      };
      action();
    },
  },
};
</script>