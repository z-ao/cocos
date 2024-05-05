<template>
  <div class="body">
    <header class="header">
      <div class="container">
        <img src="@/assets/images/base/title.png" class="icon" alt="工具网" />
        <h1 class="h1">PDF转图片</h1>
      </div>
    </header>
    <main class="main">
      <section class="card">
        <input ref="$file" class="hidden" type="file" name="pdf" accept="application/pdf" @change="fileChange" />
        <div ref="$canvas" class="hidden"></div>

        <a href="javascript:;" class="button" :class="disabled ? 'button-disabled' : ''" @click="clickHandle">上传PDF文件</a>
        <div class="tips" v-show="tips">
          <img src="@/assets/images/base/loading.svg" class="tips-image" />
          <span class="tips-text">{{ tips }}</span>
        </div>
      </section>
    </main>
    <footer class="footer">
      <div class="container">
        Copyright © 2021 ❤️ 
        扎克斯体验技术部出品 
        <a href="https://beian.miit.gov.cn" target="_blank">粤ICP备18089899号</a>
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44011802000279" target="_blank">粤公网安备 44011802000279号</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { saveAs } from 'file-saver'
  import JSZip from 'jszip'
  import { canvasToBlob, getFileNamePure } from '@/globals/client'
  import PDFJS from 'pdfjs-dist'
  PDFJS.GlobalWorkerOptions.workerSrc = '//yk-fe.oss-cn-beijing.aliyuncs.com/admin/base/pdfjs/pdf.worker.js'

  const disabled = ref(false)
  const tips = ref('')
  const $file = ref<HTMLInputElement>()
  const $canvas = ref<HTMLDivElement>()

  const clickHandle = () => {
    if(disabled.value) return;

    $file.value!.click()
  }

  const fileChange = async function(evt: Event) {
    const files = (evt.target as HTMLInputElement).files
    if (!files || !files.length) return;

    disabled.value = true
    tips.value = '解析PDF中'

    const url = URL.createObjectURL(files[0])
    const name = getFileNamePure(files[0].name)
    const pdf = await PDFJS.getDocument(url).promise
    URL.revokeObjectURL(url);
    ($file.value as any).value = null
    if (!pdf) {
      fileReset()
      alert('解析PDF失败')
      return
    };

    const zip = new JSZip()

    //解析PDF文件页面
    for (let pIdx = 1; pIdx <= pdf.numPages; pIdx++) {
      tips.value = `获取PDF图片中(${pIdx}/${pdf.numPages})`

      const page = await pdf.getPage(pIdx)
      if (!page) {
        fileReset()
        alert('获取PDF失败')
        break
      }
      //创建canvas
      const canvas = document.createElement('canvas') as HTMLCanvasElement
      $canvas.value!.appendChild(canvas)
      //设置尺寸
      const viewport = page.getViewport({ scale: 1 })
      const context = canvas.getContext('2d')
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      //渲染pdf
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      await page.render(renderContext).promise
      const blob = await canvasToBlob(canvas)
      zip.file(`${name}_${pIdx}.png`, blob)

      $canvas.value!.removeChild(canvas)
    }

    tips.value = '压缩文件中'
    const zipData = await zip.generateAsync({type: 'blob'}).then(data => data).catch(() => false)
    if(!zipData) {
      fileReset()
      alert('压缩文件失败')
      return
    }

    saveAs(zipData, `${name}.zip`)
    fileReset()
  }

  const fileReset = function() {
    disabled.value = false
    tips.value = ''
  }
</script>

<style lang="less" scoped>
.body{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fbfbfb;

  /*头部*/
  .header{
    flex: 0 0 70px;
    display: block;
    background: #fff;
    box-shadow: 0 1px 0 0 rgb(17 17 17 / 7%);

    .container{
      display: flex;
      max-width: 900px;
      align-items: center;
      margin: 0 auto;
      height: 70px;

      .h1{
        font-size: 28px;
        color: #282828;
        font-weight: 600;
      }

      .icon{
        height: 24px;
        width: auto;
        margin-right: 4px;
      }
    }
  } 

  /*内容*/
  .main{
    display: block;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 30px 0;
    flex: 1;

    .card{
      background: #fff;
      padding: 24px;
      margin-bottom: 18px;
      font-size: 12px;

      .hidden{
        display: none;
      }

      .button{
        display: inline-block;
        line-height: 1.5715;
        padding: 5px 15px;
        border-color: #1890ff;
        background: #1890ff;
        text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
        box-shadow: 0 2px #0000000b;
        font-size: 14px;
        color: #fff;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        text-decoration: none;

        &:active{
          border-color: #096dd9;
          background: #096dd9;
        }

        &:hover{
          border-color: #40a9ff;
          background: #40a9ff;
        }
      }

      .button-disabled{
        background-color: #ddd;
        cursor: no-drop;
      }

      .tips{
        margin-top: 20px;

        .tips-image{
          height: 25px;
          vertical-align: top;
        }

        .tips-text{
          display: inline-block;
          vertical-align: top;
          height: 25px;
          line-height: 25px;
          font-size: 14px;
          color: #333;
        }
      }

      .result{
        line-height: 1.57;
        margin-top: 8px;
        font-size: 14px;
        color: #000;
      }
    }
  }

  /*底部*/
  .footer{
    display: block;
    flex: 0 0 70px;
    padding: 25px 0;
    background: #282828;
    box-sizing: border-box;

    .container{
      max-width: 900px;
      margin: 0 auto;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #888888;

      a{
        font-size: 12px;
        color: #888888;
        text-decoration: none;
      }
    }
  }
}
</style>