Rails.application.routes.draw do
  devise_for :users

  root 'dashboard#index'

  resources :tasks, only: %i[create update destroy]

  mount ActionCable.server => '/cable'
end
