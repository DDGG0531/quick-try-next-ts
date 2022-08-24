import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { IUser, Gender } from '@/libs/interfaces/IUser'
import { isValid } from 'date-fns'

/**
 * 嘗試react-hook-form 整合 ts 整合yup
 *
 * 塑出表單：包含姓名、電話、年紀、性別、生日
 */

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

export default function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>({
    resolver: async (data, context, options) => {
      console.log('[validation]data', data)
      console.log(
        'validation result!!!',
        await yupResolver(formSchema)(data, context, options)
      )
      return yupResolver(formSchema)(data, context, options)
    },
    defaultValues: defaultUser1
  })

  // HACK: 提交的data 竟然是被轉換過的值，甚至不需要 字串轉數字
  const onSubmit: SubmitHandler<IUser> = data => console.log(data)

  const inputClass =
    'mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-nonefocus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500disabled:border-slate-200 disabled:bg-slate-50disabled:text-slate-500 disabled:shadow-none'

  return (
    <div className="flex justify-center">
      <section className="w-2/4 rounded bg-gray-100 p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              名稱
            </span>
            <input {...register('name')} type="text" className={inputClass} />
            <span className="block text-danger">
              {errors.name ? errors.name?.message : ''}
            </span>
          </label>

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
