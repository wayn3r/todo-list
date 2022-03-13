import { Sqlite3Database } from '../../src/shared/infrastructure/Sqlite3Database';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('TaskController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const db = new Sqlite3Database();
    await db.query('DELETE FROM tasks');
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/task (POST) should fail if no data is provided', () => {
    return request(app.getHttpServer())
      .post('/task')
      .expect(422)
      .expect([
        { name: 'title', message: 'Task title is required' },
        { name: 'status', message: 'Task status is required' },
      ]);
  });
  it('/task (POST) should return a new task with default values', () => {
    return request(app.getHttpServer())
      .post('/task')
      .send({ title: 'test', status: 'in progress' })
      .expect(201)
      .expect({
        id: 1,
        title: 'test',
        description: null,
        priority: 'low',
        status: 'in progress',
      });
  });
  it('/task (POST) should return a new task', () => {
    return request(app.getHttpServer())
      .post('/task')
      .send({
        title: 'test number 2',
        description: 'teting with all fields',
        priority: 'medium',
        status: 'open',
      })
      .expect(201)
      .expect({
        id: 1,
        title: 'test number 2',
        description: 'teting with all fields',
        priority: 'medium',
        status: 'open',
      });
  });
});
