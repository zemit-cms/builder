import { VNodeProps } from "vue";
import { VDialog } from "vuetify/components/VDialog";
import { VCombobox } from "vuetify/components/VCombobox";

export type ExtractProps<T> = T extends new () => {$props: infer P} ? Omit<P, keyof VNodeProps> : never

export type VDialogProps = ExtractProps<typeof VDialog>
export type VComboboxProps = ExtractProps<typeof VCombobox>
