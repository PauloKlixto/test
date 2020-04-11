import request from '@/api/plugins/request'

export default {
  async fechPayment(body, success, error, done) {
    return await request(
      {
        method: 'post',
        url: 'pagar/',
        body
      },
      success,
      error,
      done
    )
  }
}
