import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required('Campo obrigatório').email('Email inválido'),
  senha: yup.string().required('Campo obrigatório'),
});

export default schema;
