const migrateToV1 = async () => {
    const pool = await require("../database").getConnectionPool();
    await pool.execute("create table IF NOT EXISTS counter_types (id int auto_increment primary key, name varchar(128) charset utf8 not null);");
    await pool.execute("create table IF NOT EXISTS counter_values (id int auto_increment primary key, counter_id int not null, registry_time date  not null, value float not null);");
    await pool.execute("create table IF NOT EXISTS users (id int auto_increment primary key, name varchar(255) not null, email varchar(255) not null, password varchar(1024) not null, phone_number varchar(20) null)");
    await pool.execute("create table IF NOT EXISTS addresses(id int auto_increment primary key, user_id int not null, address varchar(512) not null, apartments int not null, fias_code varchar(20) not null);");
    await pool.execute("create table IF NOT EXISTS counters (id int auto_increment primary key, name varchar(128) not null, user_id int not null, address_id int not null, counter_type_id int not null)");
    await pool.execute("create table IF NOT EXISTS version (no int not null primary key)");
    await pool.execute("INSERT INTO counter_types (name) VALUES(\"Горячая вода\")");
    await pool.execute("INSERT INTO counter_types (name) VALUES(\"Холодная вода\")");
    await pool.execute("INSERT INTO counter_types (name) VALUES(\"Газ\")");
    await pool.execute("INSERT INTO counter_types (name) VALUES(\"Электричество\")");
    await pool.execute("INSERT INTO version (no) VALUES(1)");
}

module.exports = {
    migrateToV1: migrateToV1
};