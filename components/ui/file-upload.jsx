"use client"

import { useState, useRef } from "react"
import { X } from "lucide-react"

export default function FileUpload({
  id,
  name,
  label,
  onChange,
  error,
  required = false,
  accept,
  multiple = false,
  maxSize = 5242880, // 5MB
  disabled = false,
  className = "",
}) {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    const newFiles = Array.from(selectedFiles)
    const validFiles = newFiles.filter((file) => file.size <= maxSize)

    if (validFiles.length !== newFiles.length) {
      // Some files were too large
      alert(`Some files exceed the ${maxSize / 1048576}MB size limit and were not added.`)
    }

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles
    setFiles(updatedFiles)

    // Pass the files to parent component
    onChange({
      target: {
        name,
        value: multiple ? updatedFiles : updatedFiles[0] || null,
      },
    })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const droppedFiles = e.dataTransfer.files
    if (!droppedFiles || droppedFiles.length === 0) return

    // Simulate file input change
    handleFileChange({ target: { files: droppedFiles } })
  }

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)

    // Pass the updated files to parent component
    onChange({
      target: {
        name,
        value: multiple ? updatedFiles : updatedFiles[0] || null,
      },
    })
  }

  const handleRemoveAll = () => {
    setFiles([])

    // Pass empty value to parent component
    onChange({
      target: {
        name,
        value: multiple ? [] : null,
      },
    })
  }

  const handleBrowseClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div className={`group ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-2 ${error ? "text-red-500" : "text-gray-700 group-hover:text-indigo-600"
            }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="space-y-4">
        {/* Hidden file input */}
        <input
          type="file"
          id={id}
          name={name}
          ref={fileInputRef}
          onChange={handleFileChange}
          className="sr-only"
          accept={accept}
          multiple={multiple}
          required={required}
          disabled={disabled}
        />

        {/* Drop zone */}
        <div
          onClick={handleBrowseClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging
              ? "border-indigo-500 bg-indigo-50"
              : error
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
            } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 bg-gray-100 rounded-full">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">Drop files here or click to upload.</p>
              <p className="text-sm text-gray-500 mt-1">
                Drop files here or click <span className="text-indigo-600 font-medium">browse</span> thorough your
                machine
              </p>
            </div>
          </div>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-white border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {file.type.startsWith("image/") ? (
                      <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        {files.length > 0 && (
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleRemoveAll}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Remove All
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
