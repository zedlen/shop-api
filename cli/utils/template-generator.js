import _ from 'lodash';

const template = (module) => {
  const hasHyphen = _.includes(module, '-');
  const moduleNameCapitalizeWithHyphen = _.upperFirst(_.camelCase(module));
  const monduleNameCapitalize = _.capitalize(module);
  const moduleName = hasHyphen ? moduleNameCapitalizeWithHyphen : monduleNameCapitalize;

  return [
    {
      name: `${module}.module`,
      extension: 'ts',
      content: `import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ${moduleName}Controller } from './infrastructure/controllers/${_.toLower(
        moduleName
      )}.controller'; 
import { ${moduleName}Service } from './domain/${_.toLower(moduleName)}.service'; 
import { ${moduleName}Repository } from './infrastructure/repositories/${_.toLower(
        moduleName
      )}.repository';
import { ${moduleName}Entity, ${moduleName}Schema } from './domain/models/entities/${_.toLower(
        moduleName
      )}.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ${moduleName}Entity.name,
        schema: ${moduleName}Schema,
      },
    ]),
  ],
  controllers: [${moduleName}Controller],
  providers: [${moduleName}Service, ${moduleName}Repository],
})
export class ${moduleName} {}`,
    },
    {
      name: `${module}.service`,
      extension: 'ts',
      content: `import { Injectable } from '@nestjs/common';

import { ${moduleName}Repository } from '../infrastructure/repositories/${_.toLower(moduleName)}.repository';

@Injectable()
export class ${moduleName}Service {
  constructor(private readonly ${_.toLower(moduleName)}Repository: ${moduleName}Repository) {}
}
`,
    },
    {
      name: `${module}.entity`,
      extension: 'ts',
      content: `import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

/* Verify the name of the collection */
@Schema({
  collection: '${_.toLower(moduleName)}s',
  timestamps: true,
  versionKey: false,
})
export class ${moduleName}Entity extends Document {
}

export const ${moduleName}Schema = SchemaFactory.createForClass(${moduleName}Entity);
`,
    },
    {
      name: `${module}.controller`,
      extension: 'ts',
      content: `import { Controller, UseFilters, UseInterceptors, ValidationPipe } from '@nestjs/common';

import { ${moduleName}Service } from '../../domain/${_.toLower(moduleName)}.service';

/* verify that this is the name of the controller you want */
@Controller('${_.toLower(moduleName)}')
export class ${moduleName}Controller {
  constructor(private readonly ${_.toLower(moduleName)}Service: ${moduleName}Service) {}
}`,
    },
    {
      name: `${module}.repository`,
      extension: 'ts',
      content: `import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ${moduleName}Entity } from '../../domain/models/entities/${_.toLower(moduleName)}.entity';

@Injectable()
export class ${moduleName}Repository {
  constructor(@InjectModel(${moduleName}Entity.name) private readonly model: Model<${moduleName}Entity>) {}
}`,
    },
  ];
};

// eslint-disable-next-line import/prefer-default-export
export { template };
