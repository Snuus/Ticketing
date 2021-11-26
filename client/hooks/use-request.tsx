import axios, { AxiosStatic } from 'axios'
import { useState } from 'react'

const useRequest = ({ url, method, body }: { url: string, method: any, body: any }) => {

  const [errors, setErrors] = useState<any[]>([])

  const request = async () => {
    try {
      const response = await axios[method](url, body)

      return response.data
    } catch (err: any) {
      setErrors(err.response.data.errors)
    }
  }


  return { request, errors }

}


export default useRequest
