// @ts-nocheck
//获取去除拓展文件名称
export const getFileNamePure = function(name) {
  const nameArr = name.split('.')
  if (nameArr.length > 1) nameArr.pop();
  return nameArr.join('.');
}

//canvas导出blbo
export const canvasToBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob)
      } else {
        reject()
      }
    }, 'image/png')
  })
}