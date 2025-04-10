import { Facebook, Mail, Share2, Twitter, X, Copy, Link, MessageCircleMore } from 'lucide-react'
import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { Button } from './ui/button'

const ShareModal = ({ videoId, isOpen, onClose }) => {
    //TODO: change this link when deploying the app
  const shareUrl = `https://yourapp.com/watch/${videoId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold mb-4">Share</Dialog.Title>

          <div className="flex justify-between gap-4 mb-4">
            <ShareButton icon={<Facebook />} label="Facebook" />
            <ShareButton icon={<Twitter />} label="X" />
            <ShareButton icon={<Mail />} label="Email" />
            <ShareButton icon={<MessageCircleMore />} label="WhatsApp" />
            <ShareButton icon={<Link />} label="Embed" />
          </div>

          <div className="bg-gray-100 p-2 rounded-lg flex justify-between items-center">
            <span className="text-sm truncate">{shareUrl}</span>
            <button
              className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
              onClick={handleCopy}
            >
              <Copy className="w-4 h-4 inline mr-1" />
              Copy
            </button>
          </div>

          <div className="mt-4 text-right">
            <Button onClick={onClose} variant="ghost">Close</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

const ShareButton = ({ icon, label }) => (
  <button className="flex flex-col items-center gap-1 text-sm hover:text-blue-600 transition">
    <div className="p-3 bg-gray-200 rounded-full">{icon}</div>
    {label}
  </button>
)

export default ShareModal
