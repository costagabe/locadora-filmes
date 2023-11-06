export const required = (message = "Campo obrigatório") => (v: string) => !!v || message
export const email = (message = "Email incorreto") => (v: string) => /.+@.+\..+/.test(v) || message
export const phone = (message = "Telefone incorreto") => (v: string) => /\(\d{2}\)\s\d{4,5}-\d{4}/.test(v) || message