import { AuthConfig } from '@ioc:Adonis/Addons/Auth'

const authConfig: AuthConfig = {
  guard: 'api',
  guards: {
    api: {
      driver: 'oat',
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'salesman_id',
      },
      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('App/Models/Salesman'),
      },
    },
    apiAccount:{
      driver: 'oat',
      tokenProvider: {
        type: 'api_account',
        driver: 'database',
        table: 'api_tokens_funcionarios',
        foreignKey: 'account_id',
      },
      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: () => import('App/Models/Account'),
      },
    },
  },
}

export default authConfig
