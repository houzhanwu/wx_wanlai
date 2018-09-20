// commpents/navbar/index.js
const app = getApp()
Component({
  properties: {
    current: {
      type: String,
      value: 'index',
    },
  },
  data: {
  },
  methods: {
    handleChange: function({ detail }) {
      const key = detail.key;
      const page = `/pages/${key}/${key}`;
      wx.switchTab({
        url: page
      });
    }
  }
})