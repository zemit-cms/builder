import { VNodeProps } from "vue";
import { VDialog } from "vuetify/components/VDialog";

export type ExtractProps<T> = T extends new () => {$props: infer P} ? Omit<P, keyof VNodeProps> : never

export type VDialogProps = ExtractProps<typeof VDialog>
