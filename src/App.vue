<template>
  <div id="app">
    <div class="panel-default">
      <div class="panel-heading">
        <p>リアルタイムチャットサンプル</p>
      </div>
      <div id="scroller" class="panel-body">
        <ul>
          <il v-for="item in list">
            <span v-if="item.name == username">
              <p class='sender_name me'>{{item.name}}</p><p class='right_balloon'>{{item.message}}</p><p class='clear_balloon'></p>
            </span>
            <span v-if="item.name != username">
              <p class='sender_name'>{{item.name}}</p><p class='right_balloon'>{{item.message}}</p><p class='clear_balloon'></p>
            </span>
          </il>
        </ul>
      </div>
      <div class="panel-footer">
        <input type='text' class="form-control" v-model="username" id="nameInput" placeholder="ユーザー名を入力してください">
      </div>
      <div class="panel-footer">
        <input type='text' class="form-control" v-model="message" id="messageInput" placeholder="メッセージ内容を入力してください">
      </div>
      <div>
        <button type="button" class="btn btn-default" @click="sendMessage">
          送信
        </button>
      </div>
    </div>
  </div>
</template>

<script>

  import firebase from 'firebase'

export default {
  name: 'app',
  data () {
    return {
      list: [],
      username: '',
      message: ''
    }
  },
  created () {
    this.listen();
  },
  methods: {
    listen () {
      firebase.database().ref('myBoard/').on('value', snapshot => { // eslint-disable-line
        if (snapshot) {
          const rootList = snapshot.val();
          let list = [];
          Object.keys(rootList).forEach((val, key) => {
            rootList[val].id = val;
            list.push(rootList[val]);
          })
          this.list = list;
        }
      })
    },
    sendMessage () {
      if (!this.username || !this.message) return
      firebase.database().ref('myBoard/').push({
        name: this.username,
        message: this.message
      });
      this.username = ''
      this.message = ''
    }
  }
}
</script>

<style>
  ul,li{
    padding: 0;
    margin: 0;
    list-style-type: none;
    text-align: left;
  }
  #scroller {
    height: 500px;
    overflow: auto;
  }

  .left_balloon {
    position: relative;
    background: #f1f0f0;
    border: 0px solid #777;
    margin: 5px 10px;
    padding: 5px 10px;
    border-radius: 15px;
    width: 400px;
    clear: both;
  }

  .right_balloon {
    color: #fff;
    position: relative;
    background: #0084ff;
    border: 0px solid #777;
    margin: 5px 10px;
    padding: 5px 10px;
    border-radius: 15px;
    width: 400px;
    clear: both;
    float: right;
  }

  .clear_balloon{
    clear: both;
  }

  .sender_name{
    margin-bottom: -5px;
    padding-left: 20px;
    color: rgba(0, 0, 0, .40);
  }
  .sender_name.me{
    float: right;
    padding: 0 20px 0 0;
  }
</style>
