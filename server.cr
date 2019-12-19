#! /usr/bin/crystal run
require "http/server"

handlers = [
  HTTP::ErrorHandler.new,
  HTTP::LogHandler.new,
  HTTP::StaticFileHandler.new("."),
]

server = HTTP::Server.new(handlers)

server.bind_tcp "127.0.0.1", 8080
server.listen
