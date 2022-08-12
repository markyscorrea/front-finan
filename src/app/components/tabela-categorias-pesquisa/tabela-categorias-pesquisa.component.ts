import { Component, OnInit, Optional } from '@angular/core';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbWindowRef } from '@nebular/theme';
import { FSEntry } from 'src/app/interfaces/FSEntry';
import { CategoriaService } from 'src/app/services/categoria.service';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { ICategoriaParaFSEntry } from 'src/app/Utils/convertInterface';

@Component({
  selector: 'app-tabela-categorias-pesquisa',
  templateUrl: './tabela-categorias-pesquisa.component.html',
  styleUrls: ['./tabela-categorias-pesquisa.component.scss']
})
export class TabelaCategoriasPesquisaComponent implements OnInit {

  customColumn = 'Nome';
  allColumns = [this.customColumn];
  dataSource!: NbTreeGridDataSource<FSEntry>;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    @Optional() protected windowRef: NbWindowRef
  ) { 

    this.categoriaService.get()
      .subscribe({
        next: c => {
          const pesquisaCategorias = ICategoriaParaFSEntry(c)
          this.dataSource = this.dataSourceBuilder.create(pesquisaCategorias);
        },
        error: err => console.log(err)
      })

  }

  ngOnInit(): void {
  }

  selecionarPessoa(nome: string, tipo: string) {
    this.lancamentoService.descricaoCategoria = nome;
    this.lancamentoService.tipoCategoria = tipo;
    this.lancamentoService.nomeCategoria.next(nome)
    this.windowRef.close();
  }

}
