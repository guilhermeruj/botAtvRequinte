import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('requinte_disp', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})

try{
  console.log('Conectamos ao Mysql')
}catch(error){
  console.log('Não conectou')
}

export default sequelize