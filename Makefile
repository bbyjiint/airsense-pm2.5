.PHONY: help up down restart logs ps db-shell migrate seed reset dev test

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

up: ## Start MySQL container in background
	docker compose up -d

down: ## Stop MySQL container
	docker compose down

restart: down up ## Restart MySQL container

logs: ## Tail MySQL container logs
	docker compose logs -f db

ps: ## Check container status
	docker compose ps

db-shell: ## Enter MySQL interactive terminal
	docker compose exec db mysql -u root -ppassword airsense_db

migrate: ## Run database migrations (schema.sql)
	cd backend && bun run migrate

seed: ## Seed database with mock devices & readings
	cd backend && bun run seed

reset: down ## Reset database (remove volume, start fresh, migrate, seed)
	docker compose down -v
	docker compose up -d
	@echo "Waiting for MySQL to be ready..."
	@until docker compose exec db mysqladmin ping -h localhost -u root -ppassword --silent > /dev/null 2>&1; do sleep 1; done
	cd backend && bun run migrate
	cd backend && bun run seed

dev: ## Start backend in development watch mode
	cd backend && bun run dev

dev-front: ## Start frontend in dev mode
	cd frontend && bun run dev

test: ## Run backend tests
	cd backend && bun run test
