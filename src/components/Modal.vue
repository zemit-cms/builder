<template>
  <v-dialog
    v-bind="vDialogProps"
    v-model="visible"
    width="auto"
  >
    <v-card>
      <template v-if="showHeader">
        <v-card-title class="d-flex justify-space-between align-center">
          <slot name="header.title">
            <v-icon v-if="icon">{{ icon }}</v-icon>
            <div v-if="title" class="text-h5 text-medium-emphasis ps-2">
              {{ title }}
            </div>
          </slot>

          <v-spacer />

          <slot name="header.options"></slot>

          <v-btn
            v-if="showCloseButton"
            icon="mdi-close"
            variant="text"
            @click="visible = false"
          ></v-btn>
        </v-card-title>
        <v-divider />
      </template>

      <slot name="content">
        <slot name="body.prepend"></slot>
        <div v-if="showBody" class="py-4 bg-toolbar">
          <v-card-text>
            <slot name="default"></slot>
            <slot name="body"></slot>
          </v-card-text>
        </div>
        <slot name="body.append"></slot>
      </slot>

      <div v-if="showActions" class="d-block">
        <v-divider />
        <v-card-actions class="d-flex justify-space-between">
          <slot name="actions.left"></slot>
          <v-spacer />
          <slot name="actions.prepend"></slot>
          <slot name="actions">
            <v-btn
              class="text-none"
              text="Cancel"
              @click="visible = false"
            ></v-btn>
          </slot>
          <slot name="actions.append"></slot>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { defineProps, defineModel } from 'vue';
import { VDialogProps } from "@/utils/props";

interface Props {
  vDialogProps?: Partial<VDialogProps>
  title: { type: [String, Boolean], default: false },
}
withDefaults(defineProps<Props>(), {
  title: ''
})

// defineProps({
//   vDialogProps: Partial<VDialogProps>,
//   value: { type: Boolean, default: true },
//   title: { type: [String, Boolean], default: false },
//   icon: { type: [String, Boolean], default: false },
//   showHeader: { type: Boolean, default: true },
//   showCloseButton: { type: Boolean, default: true },
//   showBody: { type: Boolean, default: true },
//   showActions: { type: Boolean, default: true },
// })

const visible = defineModel();
</script>

<style lang="scss" scoped>

</style>
