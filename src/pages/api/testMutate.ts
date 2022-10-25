import { NextApiResponse, NextApiRequest } from 'next'

const isSuccess = false
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  if (isSuccess) {
    res.status(200).send({ data: '修改成功' })
  } else {
    res.status(500).send({ error: '修改失敗' })
  }
}
