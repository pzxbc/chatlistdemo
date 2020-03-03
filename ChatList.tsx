import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import {ws} from './resolution'
import produce from 'immer'

let msgId = 0

const getMsgId = () => {
  return ++msgId
}

const ItemSeparator = (props) => (<View style={{ height: ws(12)}} />)

const WingBlank = (props) => (<View style={{width: props.size}} />)

const Avatar = (props) => (<View style={{width: ws(40), height: ws(40), backgroundColor: 'gray', borderRadius: ws(40)}} />)

const SendItem = (props) => {
  return (
    <View style={{ paddingRight: ws(15), flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
      <View style={{ width: ws(275), backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end' }}>
        <View style={{ alignSelf: 'flex-end', backgroundColor: '#82A8EB', borderRadius: ws(10), paddingHorizontal: ws(15), paddingVertical: ws(10) }}>
          <Text style={{ color: '#FFFFFF', fontSize: ws(14) }}>
            {props.data.txt}
          </Text>
        </View>
      </View>
      <WingBlank size={ws(10)} />
      <Avatar />
    </View>
  )
}

class ChatList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatData: [],
      headerHeight: 0,
    }
    this.contentHeight = 0
    this.listHeight = 0
  }

  componentDidMount() {
    this.secTimer = setInterval(this.onTimer, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.secTimer)
  }

  onTimer = () => {
    this.setState(produce(this.state, draft => {
      const key = getMsgId()
      let newMsg = { key, txt: `new msg with id ${key}` }
      draft.chatData.unshift(newMsg)
    }))
  }

  renderItem = ({ item }) => {
    // MsgItem: SendItem or ReceiveItem
    return (
      <SendItem data={item} />
    )
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    // console.log('onContentSizeChange', contentWidth, contentHeight)
    this.contentHeight = contentHeight
    let extraHeight = this.listHeight - (this.contentHeight - this.state.headerHeight)
    if (extraHeight > ws(12)) {
      this.setState(produce(this.state, draft => {
        draft.headerHeight = extraHeight
      }))
    }
    else {
      this.setState(produce(this.state, draft => {
        draft.headerHeight = ws(12)
      }))
    } 
  }

  onLayout = ({nativeEvent: {layout}}) => {
    this.listHeight = layout.height
    let extraHeight = this.listHeight - (this.contentHeight - this.state.headerHeight)
    if (extraHeight > ws(12)) {
      this.setState(produce(this.state, draft => {
        draft.headerHeight = extraHeight
      }))
    }
    else {
      this.setState(produce(this.state, draft => {
        draft.headerHeight = ws(12)
      }))
    } 
  }
  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        inverted={true}
        data={this.state.chatData}
        keyExtractor={(item) => item.key.toString()}
        renderItem={this.renderItem}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => (<View style={{height: this.state.headerHeight}} />)}
        ListFooterComponent={ItemSeparator}
        onContentSizeChange={this.onContentSizeChange}
        onLayout={this.onLayout}
      />
    )
  }
}

export default ChatList