import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { IUser, Gender } from '@/libs/interfaces/IUser'
import { isValid } from 'date-fns'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react'

const formSchema: yup.SchemaOf<IUser> = yup.object().shape({
  name: yup.string().required('必填'),
  phone: yup.string().required('必填'),
  age: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('必填'),
  gender: yup
    .mixed<Gender>()
    .oneOf(Object.values(Gender), '性別為必填')
    .required('必填'),
  birthday: yup
    .string()
    .required('必填')
    .test('date', '錯誤時間格式', value => isValid(new Date(value as string)))
})

// Try defaultUser1 for create、defaultUser2 for edit、defaultUser3部分初始化
const defaultUser1 = undefined
const defaultUser2 = {
  name: 'Jim',
  phone: '0900000100',
  age: 10,
  gender: Gender['Male'],
  birthday: '2022-07-11'
}
const defaultUser3 = {
  name: 'Jim'
}

export default function Form({ submit }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>({
    resolver: async (data, context, options) => {
      return yupResolver(formSchema)(data, context, options)
    },
    defaultValues: defaultUser1
  })

  const onSubmit: SubmitHandler<IUser> = data => {
    console.log(data)
    submit()
  }

  const inputClass =
    'mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-nonefocus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500disabled:border-slate-200 disabled:bg-slate-50disabled:text-slate-500 disabled:shadow-none'

  return (
    <div className="flex w-full justify-center">
      <section className="rounded bg-gray-100 p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors['name']}>
            <FormLabel htmlFor={'name'}>{'name'}</FormLabel>

            <Input
              id={'name'}
              variant="flushed"
              placeholder={'name'}
              className="placeholder:text-gray-medium"
              {...register('name')}
            />

            <FormErrorMessage>
              {errors['name'] && errors['name'].message}
            </FormErrorMessage>
          </FormControl>

          {/* <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              名稱
            </span>
            <input {...register('name')} type="text" className={inputClass} />
            <span className="block text-danger">
              {errors.name ? errors.name?.message : ''}
            </span>
          </label> */}

          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              電話號碼
            </span>
            <input {...register('phone')} type="text" className={inputClass} />
            <span className="block text-danger">
              {errors.phone ? errors.phone?.message : ''}
            </span>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              年紀
            </span>
            <input {...register('age')} type="text" className={inputClass} />
            <span className="block text-danger">
              {errors.age ? errors.age?.message : ''}
            </span>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              性別
            </span>

            <select {...register('gender')} className={inputClass}>
              <option value="">Select...</option>
              <option value="male">男生</option>
              <option value="female">女生</option>
            </select>
            <span className="block text-danger">
              {errors.gender ? errors.gender?.message : ''}
            </span>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              生日
            </span>
            <input
              {...register('birthday')}
              type="date"
              className={inputClass}
            />
            <span className="block text-danger">
              {errors.birthday ? errors.birthday?.message : ''}
            </span>
          </label>

          <input type="submit" />
        </form>
      </section>
    </div>
  )
}
