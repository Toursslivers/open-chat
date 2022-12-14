import { Component, onMount, Show } from 'solid-js'
import { Message as MessageType } from '../../types'
import { formatDate, formatMsgDate, formatTime } from '../../utils/dateFormat'
import createContextMenu from '../../hooks/createContextMenu'
import ContextMenu from './ContextMenu'
import Avatar from './Avatar'

const Message: Component<{ message: MessageType; showAvatar: boolean }> =
  ({ message, showAvatar = true }) => {
    let messageRef: HTMLDivElement

    const { isOpen, open, close, hide, position } = createContextMenu(messageRef)

    onMount(() => console.log('messageRef', messageRef))

    return (
      <>
        <Show when={showAvatar}>
          <div class='w-full h-4 shrink-0' />
        </Show>
        <div
          class='pr-4 pl-[72px] w-full flex items-end hover:bg-base-300 relative group'
          ref={messageRef}
          onContextMenu={open}
        >
          <Show when={showAvatar}>
            <Avatar
              type='circle'
              url='https://www.com8.cn/wp-content/uploads/2020/11/20201108023309-5fa758e5be02a.jpg'
              Class='absolute left-4 top-0.5'
            />
          </Show>
          <Show when={!showAvatar}>
          <span class='absolute left-0 top-0 w-14 text-xs opacity-0 group-hover:opacity-100'>
            <div class='h-[22px] flex items-center justify-end pr-1'>
              <span>{formatTime(message.date)}</span>
            </div>
          </span>
          </Show>
          <p class='text-15' style={{ 'white-space': 'pre-wrap' }}>
            <Show when={showAvatar}>
            <span class='text-white'>
              <span class='cursor-pointer mr-2'>Tourssliver</span>
              <span class='text-xs text-base-content cursor-pointer shrink-0'>
                {formatMsgDate(message.date)}
              </span>
            </span>
              <br />
            </Show>
            {message.content?.text}
          </p>
          <Show when={isOpen()}>
            <ContextMenu position={position()} />
          </Show>
        </div>
      </>
    )
  }

export default Message
