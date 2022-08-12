import { Component, OnInit, Optional } from '@angular/core';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbWindowRef } from '@nebular/theme';
import { FSEntry } from 'src/app/interfaces/FSEntry';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { IPessoaParaFSEntry } from 'src/app/Utils/convertInterface';

@Component({
  selector: 'app-tabela-pessoas-pesquisa',
  templateUrl: './tabela-pessoas-pesquisa.component.html',
  styleUrls: ['./tabela-pessoas-pesquisa.component.scss']
})
export class TabelaPessoasPesquisaComponent implements OnInit {

  customColumn = 'Nome';
  allColumns = [this.customColumn];
  dataSource!: NbTreeGridDataSource<FSEntry>;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService,
    @Optional() protected windowRef: NbWindowRef

  ) {
    this.pessoaService.get()
    .subscribe({
      next: p => {
          const pesquisaPessoas = IPessoaParaFSEntry(p)
          this.dataSource = this.dataSourceBuilder.create(pesquisaPessoas);
      },
      error: err => console.log(err)
    })
  }

  ngOnInit(): void {

  }

  selecionarPessoa(id: string, nome: string) {
    this.lancamentoService.idPessoa = id;
    this.lancamentoService.nomePessoa.next(nome)
    this.windowRef.close();
  }

}
