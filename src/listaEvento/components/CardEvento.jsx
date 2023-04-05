import React from 'react'
import './CardEvento.css'

export const CardEvento = ({ folio_llamada, fecha_llamada, descripcion_llamada,municipio }) => {
  return (
    <div className="card mb-3 cardStyle max-width: 540px;" >
    <div className="row g-0">
      <div className="col-md-4">
        <img src="/src/assets/event.png" className="img-fluid rounded-start" alt="..."/>
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Estatus: <img className='circle' src='/src/assets/indicadores/1.png'></img> </h5>
          <p className='card-text'>{folio_llamada}</p>
          <p className="card-text">{descripcion_llamada}</p>
          <p className="card-text">{municipio}</p>
          <p className="card-text"><small className="text-muted">Fecha de llamada: {fecha_llamada}</small></p>
        </div>
      </div>
    </div>
  </div>
  )
}
