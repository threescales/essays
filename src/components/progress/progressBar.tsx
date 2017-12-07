import * as React from 'react'
export const ProgressBar = ({ progress = 0 }) => {
    return progress && progress != 100 ? <progress value={progress} max="100" style={{ width: '100%' }}></progress> : null
}