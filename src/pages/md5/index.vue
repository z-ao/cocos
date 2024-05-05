<template>
  <div class="body">
    <header class="header">
      <div class="container">
        <img src="@/assets/images/base/title.png" class="icon" alt="工具网" />
        <h1 class="h1">MD5在线加密</h1>
      </div>
    </header>
    <main class="main">
      <section class="card">
        <div class="sub">要加密的字符串</div>
        <textarea class="textarea" placeholder="请输入" v-model="textarea"></textarea>
        <a href="javascript:;" class="button" @click="encodeHandle">加密</a>
        <div class="result" v-show="resultUpperCase && resultLowerCase">
          <span>32位大写：{{ resultUpperCase }}</span><br/>
          <span>32位小写：{{ resultLowerCase }}</span>
        </div>
      </section>
      <section class="card">
        MD5信息摘要算法（英语：MD5 Message-Digest Algorithm），一种被广泛使用的密码散列函数，可以产生出一个128位（16字节）的散列值（hash value），用于确保信息传输完整一致。MD5由美国密码学家罗纳德·李维斯特（Ronald Linn Rivest）设计，于1992年公开，用以取代MD4算法。这套算法的程序在 RFC 1321 标准中被加以规范。1996年后该算法被证实存在弱点，可以被加以破解，对于需要高度安全性的数据，专家一般建议改用其他算法，如SHA-2。2004年，证实MD5算法无法防止碰撞（collision），因此不适用于安全性认证，如SSL公开密钥认证或是数字签名等用途。
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
  import md5 from 'crypto-js/md5'

  const textarea = ref('')
  const resultUpperCase = ref('')
  const resultLowerCase = ref('')

  const encodeHandle = () => {
    const result = md5(textarea.value).toString()
    resultUpperCase.value = result.toUpperCase()
    resultLowerCase.value = result.toLowerCase()
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

      .sub{
        line-height: 1.57;
        margin-bottom: 8px;
        font-size: 14px;
        color: #000;
      }

      .textarea{
        display: block;
        position: relative;
        width: 100%;
        padding: 4px 11px;
        min-height: 80px;
        max-width: 450px;
        margin: 0 0 8px;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: "tnum";
        color: #000000;
        font-size: 14px;
        line-height: 1.5715;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        transition: all .3s;
        box-sizing: border-box;
        outline: 0;
        font-size: 16px;

        &:hover{
          border-color: #40a9ff;
          box-shadow: 0 0 0 2px #cbe6ff;
          border-right-width: 1px;
          outline: 0;
        }
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