import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../config/configFile'

export default function RTE({
  name,
  control,
  label,
  defaultValue = '',
}) {
  return (
    <div className="mb-6">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1">
          {label}
        </label>
      )}

      <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
        <Controller
          name={name || 'content'}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey={conf.tinyMceApiKey}
              initialValue={defaultValue}
              init={{
                height: 400,
                menubar: true,
                skin: 'oxide-dark', // 👈 Dark skin
                content_css: 'dark', // 👈 Dark content styling
                plugins: [
                  'advlist autolink lists link image charmap preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table code help wordcount',
                ],
                toolbar:
                  'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  )
}