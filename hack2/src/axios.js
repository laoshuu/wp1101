import axios from 'axios'
import number from './App'

const instance = axios.create({ baseURL: 'http://localhost:4000' })

const save = async () => {
    const { data: { msg } } = await instance.post('/save', { number })
    return msg
}

export { save }