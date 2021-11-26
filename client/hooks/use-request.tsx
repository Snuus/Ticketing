import axios, { AxiosStatic } from 'axios'
import { useState } from 'react'

const useRequest = ({ url, method, body, onSucces }: { url: string, method: any, body: any, onSucces: any }) => {

  const [errors, setErrors] = useState<any[]>([])

  const request = async () => {
    try {
      const response = await axios[method](url, body)

      if (onSucces) {
        onSucces(response.data)
      }

      return response.data
    } catch (err: any) {
      setErrors(err.response.data.errors)

    }
  }


  return { request, errors }

}


export default useRequest
