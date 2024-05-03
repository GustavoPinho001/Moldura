import React, { ChangeEvent, MouseEventHandler, useRef, useState } from 'react'
import AvatarEditor, { type Position } from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import moldura01 from '../../assets/molduras/moldura1.png'
import moldura02 from '../../assets/molduras/moldura2.png'
import moldura03 from '../../assets/molduras/moldura3.png'
import moldura04 from '../../assets/molduras/moldura4.png'
import moldura05 from '../../assets/molduras/moldura5.png'
import moldura06 from '../../assets/molduras/moldura6.png'


type State = {
    image: string | File
    allowZoomOut: boolean
    position: Position
    scale: number
    rotate: number
    borderRadius: number
    preview?: {
        img: string
        rect: {
            x: number
            y: number
            width: number
            height: number
        }
        scale: number
        width: number
        height: number
        borderRadius: number
    }
    width: number
    height: number
    disableCanvasRotation: boolean
    isTransparent: boolean
    backgroundColor?: string
    showGrid: boolean
}

const Home = () => {
    const editor = useRef<AvatarEditor>(null);
    const [visibleImage, setVisibleImage] = useState(false);
    const [imagemMoldura, setImagemMoldura] = useState<string>()
    const [state, setState] = useState<State>({
        image: "",
        allowZoomOut: false,
        position: { x: 0.5, y: 0.5 },
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: undefined,
        width: 500,
        height: 500,
        disableCanvasRotation: false,
        isTransparent: false,
        backgroundColor: undefined,
        showGrid: false,
    });

    const handleSetMoldura = (mold: string) => {
        setVisibleImage(true);
        setImagemMoldura(mold)

    }
    const handleNewImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setState({ ...state, image: e.target.files[0] })
        }
    };

    const handleSave = () => {
        const img = editor.current?.getImageScaledToCanvas().toDataURL()
        const rect = editor.current?.getCroppingRect()

        if (!img || !rect) return

        setState({
            ...state,
            preview: {
                img,
                rect,
                scale: state.scale,
                width: state.width,
                height: state.height,
                borderRadius: state.borderRadius,
            },
        })
    };

    const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
        const scale = parseFloat(e.target.value)
        setState({ ...state, scale })
    }

    const handleAllowZoomOut = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, allowZoomOut: e.target.checked })
    }

    const handleDisableCanvasRotation = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, disableCanvasRotation: e.target.checked })
    }

    const rotateScale = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setState({ ...state, rotate: parseFloat(e.target.value) })
    }

    const rotateLeft: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        setState({ ...state, rotate: (state.rotate - 90) % 360 })
    }

    const rotateRight: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        setState({ ...state, rotate: (state.rotate + 90) % 360 })
    }

    const handleBorderRadius = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, borderRadius: parseInt(e.target.value) })
    }

    //   const handleXPosition = (e: ChangeEvent<HTMLInputElement>) => {
    //     setState({
    //       ...state,
    //       position: { ...state.position, x: parseFloat(e.target.value) },
    //     })
    //   }

    //   const handleYPosition = (e: ChangeEvent<HTMLInputElement>) => {
    //     setState({
    //       ...state,
    //       position: { ...state.position, y: parseFloat(e.target.value) },
    //     })
    //   }

    const handleWidth = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, width: parseInt(e.target.value) })
    }

    const handleHeight = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, height: parseInt(e.target.value) })
    }

    const logCallback = (e: any) => {
        console.log('callback', e)
    }

    const handlePositionChange = (position: Position) => {
        setState({ ...state, position })
    }

    const setBackgroundColor = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, backgroundColor: e.target.value })
    }

    const setTransparent = (e: ChangeEvent<HTMLInputElement>) => {
        const isTransparent = e.target.checked
        // set color to white initially
        const backgroundColor = isTransparent ? '#fff' : undefined

        setState({ ...state, backgroundColor, isTransparent })
    }

    const handleShowGrid = (e: ChangeEvent<HTMLInputElement>) =>
        setState({ ...state, showGrid: e.target.checked })

    return (
        <div className='w-full h-full flex justify-around items-center p-8 bg-transparent rounded-2xl backdrop-blur-xl border   '>




            <div className=' flex flex-col w-[50%] h-full items-center justify-between border-r-2 pr-2' >
                <div className='flex gap-11 h-[30%] overflow-x-scroll'>
                    <img src={moldura01} onClick={() => handleSetMoldura(moldura01)} width={300} alt="" />
                    <img src={moldura02} onClick={() => handleSetMoldura(moldura02)} width={300} alt="" />
                    <img src={moldura03} onClick={() => handleSetMoldura(moldura03)} width={300} alt="" />
                    <img src={moldura04} onClick={() => handleSetMoldura(moldura04)} width={300} alt="" />
                    <img src={moldura05} onClick={() => handleSetMoldura(moldura05)} width={300} alt="" />
                    <img src={moldura06} onClick={() => handleSetMoldura(moldura06)} width={300} alt="" />
                </div>
                <div className='w-full h-[70%] '>
                    Zoom:{' '}
                    <input

                        className=''
                        name="scale"
                        type="range"
                        onChange={handleScale}
                        min={state.allowZoomOut ? '0.1' : '1'}
                        max="2"
                        step="0.01"
                        defaultValue="1"
                    />
                    <br />
                    {'Allow Scale < 1'}
                    <input
                        name="allowZoomOut"
                        type="checkbox"
                        onChange={handleAllowZoomOut}
                        checked={state.allowZoomOut}
                    />
                    <br />
                    Show grid:{' '}
                    <input
                        type="checkbox"
                        checked={state.showGrid}
                        onChange={handleShowGrid}
                    />
                    <br />
                    Border radius:
                    <input
                        name="scale"
                        type="range"
                        onChange={handleBorderRadius}
                        min="0"
                        max="50"
                        step="1"
                        defaultValue="0"
                    />
                    <br />
                    Avatar Width:
                    <input
                        name="width"
                        type="number"
                        onChange={handleWidth}
                        min="50"
                        max="400"
                        step="10"
                        value={state.width}
                    />
                    <br />
                    Avatar Height:
                    <input
                        name="height"
                        type="number"
                        onChange={handleHeight}
                        min="50"
                        max="400"
                        step="10"
                        value={state.height}
                    />
                    <br />
                    Rotate:
                    <button onClick={rotateLeft}>Left</button>
                    <button onClick={rotateRight}>Right</button>
                    <br />
                    Disable Canvas Rotation
                    <input
                        name="disableCanvasRotation"
                        type="checkbox"
                        onChange={handleDisableCanvasRotation}
                        checked={state.disableCanvasRotation}
                    />
                    <br />
                    Rotation:
                    <input
                        name="rotation"
                        type="range"
                        onChange={rotateScale}
                        min="0"
                        max="180"
                        step="1"
                        defaultValue="0"
                    />
                    <br />
                    Transparent image?
                    <input
                        type="checkbox"
                        onChange={setTransparent}
                        defaultChecked={state.isTransparent}
                    ></input>
                    <br />
                    {state.isTransparent && (
                        <div style={{ marginLeft: '1rem' }}>
                            Background color:
                            <input
                                name="backgroundColor"
                                type="color"
                                defaultValue={state.backgroundColor}
                                onChange={setBackgroundColor}
                            />
                            <br />
                        </div>
                    )}
                    <br />
                    <input type="button" onClick={handleSave} value="Baixar imagem" />
                    <br />
                </div>

            </div>

            <div className='w-[50%] flex flex-col gap-9 h-full items-center justify-center'>

                {visibleImage && (
                    <img
                        className='absolute'
                        src={imagemMoldura}
                        width={400}
                        height={400}
                        alt="" />
                )}
                <div className='flex justify-around w-full'>

                    <button
                        className='p-3 border hover:bg-gray-500 rounded-2xl w-20 '
                        onClick={() => { setVisibleImage(false) }}>Editar</button>

                    <button
                        className='p-3 border hover:bg-gray-500 rounded-2xl w-20'
                        onClick={() => { setVisibleImage(true) }}>ok</button>
                </div>

                <Dropzone

                    onDrop={([image]) => setState({ ...state, image })}
                    noClick
                    multiple={false}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="absolute'">
                            <AvatarEditor
                                ref={editor}
                                scale={state.scale}
                                width={state.width}
                                height={state.height}
                                position={state.position}
                                onPositionChange={handlePositionChange}
                                rotate={state.rotate}
                                borderRadius={state.width / (100 / state.borderRadius)}
                                backgroundColor={state.backgroundColor}
                                onLoadFailure={logCallback.bind(this, 'onLoadFailed')}
                                onLoadSuccess={logCallback.bind(this, 'onLoadSuccess')}
                                onImageReady={logCallback.bind(this, 'onImageReady')}
                                image={state.image}
                                disableCanvasRotation={state.disableCanvasRotation}
                            />
                            <input
                                name="newImage"
                                type="file"
                                onChange={handleNewImage}
                                {...getInputProps()}
                            />
                        </div>
                    )}
                </Dropzone>

            </div>
        </div>
    )
}

export default Home;