<script lang="ts" setup>
import { defineModel, useSlots } from 'vue';
import { VDialogProps } from "@/utils/props";

withDefaults(defineProps<{
  vDialogProps?: Partial<VDialogProps>,
  title: string | boolean,
  icon: string | boolean,
  showHeader?: boolean,
  showCloseButton?: boolean,
  showBody?: boolean,
  showActions?: boolean,
  hideHeaderDivider?: boolean,
  hideFooterDivider?: boolean,
  defaultBtnText?: string,
}>(), {
  vDialogProps: undefined,
  title: false,
  icon: false,
  showHeader: true,
  showCloseButton: true,
  showBody: true,
  showActions: true,
  hideHeaderDivider: false,
  hideFooterDivider: false,
  defaultBtnText: 'Cancel',
})

const visible = defineModel<boolean>();
const slots = useSlots();
</script>

<template>
  <v-dialog
    v-bind="vDialogProps"
    v-model="visible"
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
        <div v-if="slots['header.append']" style="flex: 0">
          <slot name="header.append"></slot>
        </div>
        <v-divider v-if="!hideHeaderDivider" />
      </template>

      <slot name="content">
        <v-card-text class="pa-0 bg-toolbar">
          <slot name="default"></slot>
          <slot name="body.prepend"></slot>
          <div v-if="showBody" class="pa-4">
            <slot name="body"></slot>
          </div>
          <slot name="body.append"></slot>
        </v-card-text>
      </slot>

      <div v-if="showActions" class="d-block">
        <v-divider v-if="!hideFooterDivider" />
        <v-card-actions class="d-flex justify-space-between">
          <slot name="actions.left"></slot>
          <v-spacer />
          <slot name="actions.prepend"></slot>
          <slot name="actions">
            <v-btn
              class="text-none"
              :text="defaultBtnText"
              @click="visible = false"
            ></v-btn>
          </slot>
          <slot name="actions.append"></slot>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>
