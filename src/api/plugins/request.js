import axios from '@/plugins/axios'

export default async (
  { method, url, body, headers },
  success,
  error,
  done = () => {}
) => {
  try {
    const res = await axios[method](url, body, { headers })
    return await success(res)
  } catch (e) {
    return await error(e)
  } finally {
    done()
  }
}
