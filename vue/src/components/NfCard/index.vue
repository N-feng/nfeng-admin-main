<template>
  <div class="card-box">
    <div class="header">
      <img src="../../../public/me.jpeg" alt />
    </div>
    <div class="content">
      <h2>Nfeng</h2>
      <h4>Web Devlopoer - Web Designer</h4>
      <span>A web developer is a programmer who specializes In, or is specifically engaged in, the development of World Wide Web applications, or applications that are run over HTTP from a web server to a web browser.</span>
      <div class="social-box">
        <a class="btn" href="https://www.facebook.com/imnfeng" target="_blank">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a class="btn" href="https://twitter.com/imnfeng" target="_blank">
          <i class="fab fa-twitter"></i>
        </a>
        <a class="btn" href="mailto:nf308561157@gmail.com">
          <i class="fab fa-google"></i>
        </a>
      </div>
    </div>
    <div class="footer">
      <p>Welcome, stranger</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NfCard',
}
</script>

<style lang="scss" scoped>
.card-box {
  background: white;
  color: #314652;
  margin: 60px auto;
  box-shadow: 1px 1px 12px #909EAA;
  overflow: hidden;
  width: 400px;
  max-width: 85vw;
  border-radius: 6px;
  box-sizing: border-box;
  .header {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
  }
  .header:after {
    content: "";
    position: absolute;
    border-top: 30px solid transparent;
    border-left: 400px solid white;
    bottom: 0;
    left: 0;
  }
  .header img {
    width: 100%;
    position: absolute;
    bottom: 1px;
    left: 0;
  }
  .content {
    padding: 10px;
    overflow: hidden;
    text-align: center;
  }
  .content h2 {
    color: #e74c3c;
    margin: 0 5px 0 0;
  }
  .content h4 {
    margin: 20px 0;
  }
  .content span {
    font-size: 12px;
    padding: 0 20px;
    display: inline-block;
    margin-bottom: 30px;
  }
  .footer {
    background: #314652;
    color: white;
    width: 100%;
    height: 80px;
    position: relative;
  }
  .footer:before {
    content: "";
    position: absolute;
    border-bottom: 30px solid transparent;
    border-right: 400px solid white;
    top: -1px;
  }
  .footer p {
    margin: 0;
    padding: 30px;
    display: block;
  }
}
$--font-size: 50px;
.social-box {
  .btn {
    display: inline-block;
    width: $--font-size;
    height: $--font-size;
    background: #f1f1f1;
    margin: 0 10px;
    border-radius: 30%;
    box-shadow: 0 5px 15px -5px #00000070;
    color: #3498db;
    overflow: hidden;
    position: relative;
  }
  .btn i {
    line-height: $--font-size;
    font-size: 26px;
    transition: 0.2s linear;
  }
  .btn:hover i {
    transform: scale(1.3);
    color: #f1f1f1;
  }
  .btn::before {
    content: "";
    position: absolute;
    width: 120%;
    height: 120%;
    background: #3498db;
    transform: rotate(45deg);
    left: -110%;
    top: 90%;
  }
  .btn:hover::before {
    animation: aaa 0.7s 1;
    top: -10%;
    left: -10%;
  }
  @keyframes aaa {
    0% {
      left: -110%;
      top: 90%;
    }
    50% {
      left: 10%;
      top: -30%;
    }
    100% {
      top: -10%;
      left: -10%;
    }
  }
}
</style>
