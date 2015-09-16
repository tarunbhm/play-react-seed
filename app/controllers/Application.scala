package controllers

import java.io.File
import javax.inject.{Singleton, Inject, Named}

import akka.actor.ActorSystem
import akka.pattern.ask
import akka.util.Timeout
import scala.concurrent.Future
import scala.concurrent.duration._
import com.typesafe.jse.Engine
import play.api.{Logger, Play}
import play.api.mvc._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.twirl.api.Html

class Application @Inject() (actorSystem: ActorSystem) extends Controller {
  implicit val timeout = Timeout(5.seconds)

  def indexServer = Action.async {implicit request =>
    val jse = actorSystem.actorOf(com.typesafe.jse.Node.props(), s"jse-${request.id}")

    val jsApp = Play.current.classloader.getResource("public/javascripts/appServer.js").toURI
    val sourceFile = new File(jsApp)

    val rendered: Future[Engine.JsExecutionResult] = (jse ? Engine.ExecuteJs(
      source = sourceFile,
      args = Nil,
      timeout = timeout.duration
    )).mapTo[Engine.JsExecutionResult]

    rendered.map { result =>
      Ok(views.html.index(Html(result.output.utf8String)))
    }
  }

  def index = Action.async {implicit request =>
    Future.successful(Ok(views.html.index(Html(""))))
  }
}
