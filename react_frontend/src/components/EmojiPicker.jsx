import React from 'react';

const emojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
  '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
  '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
  '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
  '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
  '👍', '👎', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✌️', '🤞',
  '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👌',
  '🤏', '✋', '🤚', '🖐️', '🖖', '👋', '🤪', '💪', '🦾', '🖤',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔'
];

export default function EmojiPicker({ onSelect }) {
  return (
    <div className="w-64 p-3 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-xl max-h-48">
      <div className="grid grid-cols-8 gap-1">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onSelect(emoji)}
            className="p-2 text-lg transition-colors duration-150 transform rounded-lg hover:bg-gray-100 hover:scale-110"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}