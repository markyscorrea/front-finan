export interface ILancamento {
	_id?: string,
    descricao: string,
	valor: any,
	status?: boolean,
	tipo_conta: number,
	tipo: string,
	data_entrada?: any,
	data_vencimento?: any,
	data_pagamento?: any,
	pessoa: string,
	categoria?: string | {
        descricao: string,
        tipo: string,
    },
	__v?: number
}