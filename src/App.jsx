import { useEffect, useState } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {  

  const [gastos, setGastos] = useState([
    ...(JSON.parse(localStorage.getItem('gastos')) ?? [])
  ]);

  const [presupuesto, setPresupesto] = useState(
      Number(localStorage.getItem('presupuesto')) ?? 0
    )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
    }, 400);
    }
  }, [ gastoEditar ])
  
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])
  

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto', presupuesto)) ?? 0

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => { // es para la animacion de como aparece el form despues de darle al '+'
        setAnimarModal(true)
    }, 400);
  }

  const guardarGasto = gasto =>{ 
    if(gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else{
      // Nuevo Gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos ([...gastos, gasto])
    }
    setAnimarModal(false) // Cuando se agregue un gasto, esto hace que cierre el form 

        setTimeout(() => {
            setModal(false)
        }, 400);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupesto={setPresupesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (  // si existe un presupuesto se agrega un boton abajo a la derecha con la imagen del icono
      <>
      <main>
        <Filtros 
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <ListadoGastos 
          gastos={gastos}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
          filtro={filtro}
          gastosFiltrados={gastosFiltrados}
        />
      </main>
        <div className='nuevo-gasto'>
          <img
            src={IconoNuevoGasto}
            alt='icono nuevo gasto'
            onClick={handleNuevoGasto}
          />
        </div>
      </>
      )}

      {modal && <Modal 
                  setModal={setModal} //  Le paso el setModal hacia el componente Modal para poder usar el componente en otro lado, en este caso 'Modal.jsx'
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                />}
    </div>
  )
}

export default App
