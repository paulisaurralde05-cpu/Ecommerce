
import React, { useState, useContext, useEffect } from 'react';
import { createProduct, editProduct } from '../services/api.js';
import AuthContext from './AuthContext.jsx';

function Form({ producto, onCancelar, onGuardar }) {
    const { adminAccessToken, isLoading } = useContext(AuthContext);

    const [formulario, setFormulario] = useState({
        name: '',
        price: '',
        stock: '',
        category: '',
        discount: 0,
    });

    useEffect(() => {
        setFormulario({
            name: producto?.name || '',
            price: producto?.price || '',
            stock: producto?.stock || '',
            category: producto?.category || '',
            discount: producto?.discount ?? 0
        });
    }, [producto]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const datos = {
                ...formulario,
                price: Number(formulario.price),
                stock: Number(formulario.stock),
                category: formulario.category,
                discount: Number(formulario.discount)
            };

            if (!producto) {
                await createProduct(datos, adminAccessToken);
            } else {
                await editProduct(producto.id, datos, adminAccessToken);
            }

            if (onGuardar) onGuardar();
            onCancelar();

        } catch (error) {
            console.log("ERROR al guardar el producto", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">

                <div className="bg-[#29241F] px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">
                        {producto ? "Editar producto" : "Crear producto"}
                    </h2>

                    <button
                        type="button"
                        onClick={onCancelar}
                        className="text-white text-2xl hover:text-[#C8793D] transition"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-[#29241F] mb-1">
                            Nombre
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formulario.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-[#E7E0D6] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#C8793D] focus:border-[#C8793D]"
                        />
                    </div>


                    <div className="flex gap-4">

                        <div className='w-1/2'>
                            <label className="block text-sm font-medium text-[#29241F] mb-1">
                                Precio
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={formulario.price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                                className="w-full border border-[#E7E0D6] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#C8793D] focus:border-[#C8793D]"
                            />
                        </div>

                        <div className='w-1/2'>
                            <label className="block text-sm font-medium text-[#29241F] mb-1">
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={formulario.stock}
                                onChange={handleChange}
                                min="0"
                                required
                                className="w-full border border-[#E7E0D6] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#C8793D] focus:border-[#C8793D]"
                            />
                        </div>

                    </div>


                    <div>
                        <label className="block text-sm font-medium text-[#29241F] mb-1">
                            Categoría
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={formulario.category}
                            onChange={handleChange}
                            className="w-full border border-[#E7E0D6] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#C8793D] focus:border-[#C8793D]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#29241F] mb-1">
                            Descuento (%)
                        </label>

                        <input
                            type="number"
                            name="discount"
                            value={formulario.discount}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="w-full border border-[#E7E0D6] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#C8793D] focus:border-[#C8793D]"
                        />
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onCancelar}
                            className="px-5 py-2 rounded-md border border-[#E7E0D6] text-[#29241F] hover:bg-[#F7F4EF] transition md:w-1/2"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-5 py-2 rounded-md bg-[#C8793D] hover:bg-[#AD6532] disabled:bg-gray-400 text-white font-medium transition md:w-1/2"
                        >
                            {producto ? "Guardar cambios" : "Crear producto"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default Form;
