import { FSEntry } from "../interfaces/FSEntry";
import { ICategoria } from "../interfaces/ICategoria";
import { IPessoa } from "../interfaces/IPessoa";
import { TreeNode } from "../interfaces/TreeNode";


export function IPessoaParaFSEntry(pessoa: IPessoa[]): TreeNode<FSEntry>[]{

    const data: TreeNode<FSEntry>[] = []

    for(let i = 0; i < pessoa.length; i++){
        data.push({
            data: {Nome: pessoa[i].nome, id: pessoa[i]._id}
        })
    }

    return data
}

export function ICategoriaParaFSEntry(categoria: ICategoria[]): TreeNode<FSEntry>[]{

    const data: TreeNode<FSEntry>[] = []

    for(let i = 0; i < categoria.length; i++){
        data.push({
            data: {Nome: categoria[i].descricao, tipo: categoria[i].tipo}
        })
    }

    return data
}