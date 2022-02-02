package main

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/halimath/fate-core-remote-table/backend/internal/boundary"
	"github.com/halimath/fate-core-remote-table/backend/internal/control"
	"github.com/halimath/fate-core-remote-table/backend/internal/infra/config"
	"github.com/halimath/kvlog"
	"github.com/halimath/kvlog/filter"
	"github.com/halimath/kvlog/formatter/jsonl"
	"github.com/halimath/kvlog/formatter/terminal"
	"github.com/halimath/kvlog/handler"
	"github.com/halimath/kvlog/msg"
)

var (
	version string = "0.0.0"
	commit  string = "local"
)

func main() {
	cfg := config.Provide()
	if cfg.DevMode {
		kvlog.Init(handler.New(terminal.Formatter, os.Stdout, filter.Threshold(msg.LevelDebug)))
	} else {
		kvlog.Init(handler.New(jsonl.New(), os.Stdout, filter.Threshold(msg.LevelInfo)))
	}

	controller := control.Provide(cfg)
	boundary := boundary.Provide(cfg, controller, version, commit)

	kvlog.Info(kvlog.Evt("startup"), kvlog.KV("version", version), kvlog.KV("commit", commit))

	termChan := make(chan int, 1)

	signalCh := make(chan os.Signal, 1)
	signal.Notify(signalCh, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		s := <-signalCh

		kvlog.Info(kvlog.Evt("receivedSignal"), kvlog.KV("signal", s))
		boundary.Close()

		termChan <- 0
	}()

	go func() {
		kvlog.Info(kvlog.Evt("httpListen"), kvlog.KV("addr", ":8080"))
		err := boundary.Start(fmt.Sprintf(":%d", cfg.HTTPPort))
		if err != http.ErrServerClosed {
			kvlog.Error(kvlog.Evt("httpServerFailedToStart"), kvlog.Err(err))
			termChan <- 1
		}
	}()

	exitCode := <-termChan
	kvlog.Info(kvlog.Evt("exit"), kvlog.KV("code", exitCode))
	kvlog.L.Close()
	os.Exit(exitCode)
}
