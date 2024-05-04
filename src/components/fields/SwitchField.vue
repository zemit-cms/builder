<script setup lang="ts">
import { IFieldListeners, IFieldProps } from '@/utils/interfaces';

export interface ISwitchFieldProps extends IFieldProps<boolean> {

}

export interface ISwitchFieldListeners extends IFieldListeners<boolean> {

}

defineEmits(['update:modelValue'])

withDefaults(defineProps<ISwitchFieldProps>(), {
  label: undefined,
})

const active = defineModel<boolean>({
  required: true,
});
</script>

<template>
  <v-switch
    v-model="active"
    :label="label"
    :error="errorMessage !== undefined"
    :error-messages="errorMessage"
    :persistent-hint="description !== undefined"
    :hint="description"
    color="primary"
    hide-details="auto"
    inset
    @update:modelValue="$emit('update:modelValue', $event)"
  ></v-switch>
</template>
