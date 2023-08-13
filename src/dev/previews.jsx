import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import TaskList from "../components/TaskList.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/TaskList">
                <TaskList/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews