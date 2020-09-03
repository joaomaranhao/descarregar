var fs = require('fs')
var readline = require('readline-sync')


const date = new Date()

const todayDate = {
  year: date.getFullYear(),
  month: date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
  day: date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`,
  monthsArray: ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'],
}

const folderName = {
  fullMonth: todayDate.monthsArray[date.getMonth()],
  folderDate: `${todayDate.year}${todayDate.month}${todayDate.day}`,
}

const paths = {
  deckPath: `G:\\\\Clip`,
  bkpPath: `Q:`,
  fullBkpPath: ''
}

const filesPath = {
  files: fs.readdirSync(paths.deckPath).filter(fn => fn.endsWith('.MXF')),
}

const retranca = readline.question("Escreva a retranca: ")


// FUNÇÕES
const createYearFolder = () => {
  const yearFolder = `${paths.bkpPath}\\\\${todayDate.year}`
  fs.existsSync(yearFolder) ? true : fs.mkdirSync(yearFolder)
}

const createMonthFolder = () => {
  const monthFolder = `${paths.bkpPath}\\\\${todayDate.year}\\\\${folderName.fullMonth}`
  fs.existsSync(monthFolder) ? true : fs.mkdirSync(monthFolder)
}

const createDayFolder = () => {
  const dayFolder = `${paths.bkpPath}\\\\${todayDate.year}\\\\${folderName.fullMonth}\\\\${todayDate.day}`
  fs.existsSync(dayFolder) ? true : fs.mkdirSync(dayFolder)
}

const createScheduleFolder = () => {
  const fullBkpPath = `${paths.bkpPath}\\\\${todayDate.year}\\\\${folderName.fullMonth}\\\\${todayDate.day}\\\\${folderName.folderDate}_${retranca.toUpperCase()}`
  fs.existsSync(fullBkpPath) ? true : fs.mkdirSync(fullBkpPath)
  paths.fullBkpPath = fullBkpPath
}

const copyRawImages = () => {
  fs.existsSync(`${paths.fullBkpPath}\\\\C0001.MXF`) ? console.log('Já ta na pasta') : copyFile()
}

const copyFile = () => {
  console.log('Transferindo...')
  filesPath.files.map((file) => {
    fs.copyFileSync(`${paths.deckPath}\\\\${file}`, `${paths.fullBkpPath}\\\\${file}`)
  })
  console.log('Terminou!')
}

createYearFolder()
createMonthFolder()
createDayFolder()
createScheduleFolder()
copyRawImages()
