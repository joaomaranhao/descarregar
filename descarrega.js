var fs = require('fs')
var readline = require('readline-sync')

const date = new Date()

// PEGANDO A DATA DO DIA
const content = {
  year: date.getFullYear(),
  month: date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
  day: date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`,
  monthsArray: ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'],
  fullMonth: '',
  fileName: '',
  files: fs.readdirSync(`G:\\\\Clip`).filter(fn => fn.endsWith('.MXF')),

}

content.fullMonth = content.monthsArray[date.getMonth()]
content.fileName = `${content.year}${content.month}${content.day}`


// PEGANDO A RETRANCA
const retranca = readline.question("Escreva a retranca: ")

// FUNÇÕES
const createMonthFolder = () => {
  fs.existsSync(`Q:\\\\2020\\\\${content.fullMonth}`) ? true : fs.mkdirSync(`Q:\\\\2020\\\\${content.fullMonth}`)
}

const createDayFolder = () => {
  fs.existsSync(`Q:\\\\2020\\\\${content.fullMonth}\\\\${content.day}`) ? true : fs.mkdirSync(`Q:\\\\2020\\\\${content.fullMonth}\\\\${content.day}`)
}

const createScheduleFolder = () => {
  fs.existsSync(`Q:\\\\2020\\\\${content.fullMonth}\\\\${content.day}\\\\${content.fileName}_${retranca.toUpperCase()}`) ? true : fs.mkdirSync(`Q:\\\\2020\\\\${content.fullMonth}\\\\${content.day}\\\\${content.fileName}_${retranca.toUpperCase()}`)
}

const copyFile = () => {
  console.log('Transferindo...')
  content.files.map((file) => {
    fs.copyFileSync(`G:\\\\Clip\\\\${file}`, `Q:\\\\2020\\\\${content.fullMonth}\\\\${content.day}\\\\${content.fileName}_${retranca.toUpperCase()}\\\\${file}`)
  })
  console.log('Terminou!')
}

const copyRawImages = () => {
  fs.existsSync(`Q:\\\\2020\\\\${content.fullMonth}\\\\${content.day}\\\\${retranca.toUpperCase()}\\\\C0001.MXF`) ? console.log('Já ta na pasta') : copyFile()
  
}

createMonthFolder()
createDayFolder()
createScheduleFolder()
copyRawImages()
