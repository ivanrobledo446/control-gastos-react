import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({ 
    gastos,
    setGastos,
    presupuesto, 
    setPresupesto,
    isValidPresupuesto,
    setIsValidPresupuesto
}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {isValidPresupuesto ? (
            <ControlPresupuesto 
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupesto={setPresupesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
        ) : (
            <NuevoPresupuesto
                presupuesto={presupuesto}
                setPresupesto={setPresupesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
        )}
    </header>
  )
}

export default Header