import { z } from 'zod'


const storeOpeningDate = new Date('2020-03-20')


const currentYear = new Date().getFullYear()


const allowedColors = [
  'AMARELO', 'AZUL', 'BRANCO', 'CINZA', 'DOURADO', 'LARANJA', 
  'MARROM', 'PRATA', 'PRETO', 'ROSA', 'ROXO', 'VERDE', 'VERMELHO'
]

const Car = z.object({
  
  brand: z
    .string({
      required_error: 'A marca é obrigatória.'
    })
    .min(1, { message: 'A marca deve ter no mínimo 1 caractere.' })
    .max(25, { message: 'A marca deve ter no máximo 25 caracteres.' }),

  model: z
    .string({
      required_error: 'O modelo é obrigatório.'
    })
    .min(1, { message: 'O modelo deve ter no mínimo 1 caractere.' })
    .max(25, { message: 'O modelo deve ter no máximo 25 caracteres.' }),

  color: z
    .enum(allowedColors, {
      required_error: 'A cor é obrigatória.',
      invalid_type_error: 'A cor deve ser uma das opções fornecidas.'
    }),

  year_manufacture: z
    .number({
      required_error: 'O ano de fabricação é obrigatório.',
      invalid_type_error: 'O ano de fabricação deve ser um número.'
    })
    .int({ message: 'O ano de fabricação deve ser um número inteiro.' })
    .min(1960, { message: `O ano de fabricação deve ser no mínimo 1960.` })
    .max(currentYear, { message: `O ano de fabricação não pode ser posterior ao ano corrente (${currentYear}).` }),

  imported: z
    .boolean({
      required_error: 'O campo "importado" é obrigatório.',
      invalid_type_error: 'O campo "importado" deve ser um booleano (true/false).'
    }),

  plates: z
    .string({
      required_error: 'A placa é obrigatória.'
    })
    .length(8, { message: 'A placa deve ter exatamente 8 caracteres.' }),

  selling_date: z
    .coerce.date({ 
      invalid_type_error: 'O formato da data de venda é inválido.'
    })
    .min(storeOpeningDate, { message: 'A data de venda não pode ser anterior à abertura da loja (20/03/2020).' })
    .max(new Date(), { message: 'A data de venda não pode ser uma data futura.' })
    .nullable()   
    .optional(),  

  selling_price: z
    .number({
      invalid_type_error: 'O preço de venda deve ser um número.'
    })
    .min(5000, { message: 'O preço de venda deve ser no mínimo R$ 5.000,00.' })
    .max(5000000, { message: 'O preço de venda deve ser no máximo R$ 5.000.000,00.' })
    .nullable()   
    .optional(),   
    
  customer_id: z
    .number({
      required_error: 'O cliente é obrigatório.',
      invalid_type_error: 'O ID do cliente deve ser um número.'
    })
    .int({ message: 'O ID do cliente deve ser um número inteiro.' })
})

export default Car